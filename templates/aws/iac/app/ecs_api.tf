resource "aws_ecs_service" "api" {
  name                               = "api"
  cluster                            = aws_ecs_cluster.main.id
  task_definition                    = aws_ecs_task_definition.api.id 
  desired_count                      = 1
  deployment_minimum_healthy_percent = 50
  deployment_maximum_percent         = 200
  launch_type                        = "FARGATE"
  scheduling_strategy                = "REPLICA"
  platform_version                   = "LATEST"
  enable_execute_command   = true

  service_connect_configuration {
    enabled   = true
    namespace = aws_service_discovery_http_namespace.main.arn

    service {
      client_alias {
        dns_name = local.api.container.name
        port     = local.api.container.port
      }

      port_name = local.api.container.name
    }

    log_configuration {
      log_driver = "awslogs"
      options = {
        awslogs-group         = "/ecs-fargate/${var.application}/service/service-connect-proxy"
        awslogs-region        = var.aws_region
        awslogs-stream-prefix = "api"
      }
    }
  }

  network_configuration {
    subnets          = aws_subnet.private.*.id
    assign_public_ip = false
    security_groups  = [aws_security_group.api_service.id, aws_security_group.app_service.id, aws_security_group.nginx_service.id]
  }

  deployment_controller {
    type = "ECS"
  }

  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/appautoscaling_policy#preserve-desired-count-when-updating-an-autoscaled-ecs-service
  lifecycle {
    ignore_changes = []
  }

  tags = local.common_tags
}

resource "aws_security_group" "api_service" {
  name   = "api-ecs-service"
  vpc_id = aws_vpc.main.id

  ingress {
    from_port = 0
    to_port   = 0
    protocol  = "-1"
    # Only allow traffic in from the app service security group
    security_groups = [aws_security_group.app_service.id, aws_security_group.lb.id]
  }

  egress {
    protocol         = "-1"
    from_port        = 0
    to_port          = 0
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  tags = merge(local.common_tags, { 
    Name = "api-ecs-service" 
    })
}

resource "aws_ecs_task_definition" "api" {
  family                   = "${var.application}-api"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = 512
  memory                   = 1024
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn            = aws_iam_role.ecs_task_role.arn

  runtime_platform {
    operating_system_family = "LINUX"
    cpu_architecture        = "X86_64"
  }

  # https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_ContainerDefinition.html
  # https://docs.aws.amazon.com/AmazonECS/latest/developerguide/specifying-sensitive-data-secrets.html#secrets-application-retrieval
  container_definitions = jsonencode([
    {
      name      = local.api.container.name
      image     = "${var.account}.dkr.ecr.${var.aws_region}.amazonaws.com/${lower(var.application)}:api"
      essential = true
      secrets   = []
      enable_execute_command   = false
      environment = [
        {
          name  = "NAME"
          value = local.api.container.name
        },
        {
          name  = "ENV"
          value = var.environment
        },
        {
          name  = "PORT"
          value = tostring(local.api.container.port)
        },
        {
          name  = "APP_URL"
          value = "http://${aws_lb.main.dns_name}"
        },
        {
          name  = "API_URL"
          value = "http://${local.api.container.name}:${tostring(local.api.container.port)}"
        },
         {
          name  = "TRPC_PORT"
          value = "${tostring(local.api.container.port)}"
        },
        {
          name  = "CLIENT_PORT"
          value = "${tostring(local.app.container.port)}"
        },
        {
          name = "OPENAI_API_KEY",
          value =  "${tostring(local.open_ai.api_key)}"
        },
        {
          name = "DB_URL",
          value =  "${tostring(local.database.url)}"
        }
      ]
      portMappings = [
        {
          name          = local.api.container.name
          containerPort = local.api.container.port
          protocol      = "tcp"
          appProtocol   = "http"
        }
      ]
      # healthCheck = {
      #   command  = ["CMD-SHELL", "curl -f http://localhost:${local.api.container.port}/health || exit 1"]
      #   interval = 30
      #   retries  = 3
      #   timeout  = 5
      # }
      initProcessEnabled = true
      privileged             = false
      readonlyRootFilesystem = false
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = "/ecs-fargate/${var.application}/service/api"
          awslogs-region        = var.aws_region
          awslogs-stream-prefix = "api"
        }
      }
      cpu    = 512
      memory = 1024
    }
  ])

  tags = local.common_tags
}

resource "aws_cloudwatch_log_group" "api" {
  name              = "/ecs-fargate/${var.application}/service/api"
  retention_in_days = var.logs_retention_in_days

  tags = local.common_tags
}

resource "aws_appautoscaling_target" "api" {
  max_capacity       = 10
  min_capacity       = 1
  resource_id        = "service/${aws_ecs_cluster.main.name}/${aws_ecs_service.api.name}"
  scalable_dimension = "ecs:service:DesiredCount"
  service_namespace  = "ecs"
}

resource "aws_appautoscaling_policy" "api_ecs_autoscaling_policy_cpu" {
  name               = "${var.application}-api-cpu-autoscaling"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.api.resource_id
  scalable_dimension = aws_appautoscaling_target.api.scalable_dimension
  service_namespace  = aws_appautoscaling_target.api.service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageCPUUtilization"
    }

    target_value       = 60
    scale_in_cooldown  = 300
    scale_out_cooldown = 300
  }

  depends_on = [aws_appautoscaling_target.api]
}

resource "aws_appautoscaling_policy" "api_esc_autoscaling_policy_memory" {
  name               = "${var.application}-api-memory-autoscaling"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.api.resource_id
  scalable_dimension = aws_appautoscaling_target.api.scalable_dimension
  service_namespace  = aws_appautoscaling_target.api.service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageMemoryUtilization"
    }

    target_value       = 80
    scale_in_cooldown  = 300
    scale_out_cooldown = 300
  }

  depends_on = [aws_appautoscaling_target.api]
}