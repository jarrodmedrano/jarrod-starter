module.exports = function (api) {
  api.cache(true);
  return {
    presets: [["babel-preset-expo", { jsxRuntime: "automatic" }]],
    plugins: [
      "react-native-reanimated/plugin",
      "nativewind/babel",
      "expo-router/babel",
      [
        "module-resolver",
        {
          alias: {
            "@ui": "../../packages/ui",
            "@app": "../../packages/app",
          },
        },
      ],
    ],
  };
};
