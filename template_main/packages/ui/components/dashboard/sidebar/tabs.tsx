import { Separator } from '@radix-ui/react-select'
import { Search } from '@ui/components/search/search'
import { Input } from '@ui/components/ui/input'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@ui/components/ui/tabs'

export default (
  <Tabs defaultValue="all">
    <div className="flex items-center px-4 py-2">
      <h1 className="text-xl font-bold">Inbox</h1>
      <TabsList className="ml-auto">
        <TabsTrigger value="all" className="text-zinc-600 dark:text-zinc-200">
          All mail
        </TabsTrigger>
        <TabsTrigger
          value="unread"
          className="text-zinc-600 dark:text-zinc-200"
        >
          Unread
        </TabsTrigger>
      </TabsList>
    </div>
    <Separator />
    <div className="bg-background/95 supports-[backdrop-filter]:bg-background/60 p-4 backdrop-blur">
      <form>
        <div className="relative">
          <Search className="text-muted-foreground absolute left-2 top-2.5 h-4 w-4" />
          <Input placeholder="Search" className="pl-8" />
        </div>
      </form>
    </div>
    <TabsContent value="all" className="m-0">
      {/* <MailList items={mails} /> */}
    </TabsContent>
    <TabsContent value="unread" className="m-0">
      {/* <MailList items={mails.filter((item) => !item.read)} /> */}
    </TabsContent>
  </Tabs>
)
