export type PersonKey = 'dhy' | 'thp' | 'hjy' | 'pp'

export interface PersonModule {
  title: string
  description: string
  path: string
  status: string
}

export interface PersonProfile {
  key: PersonKey
  name: string
  subtitle: string
  description: string
  modules: PersonModule[]
}

export const personProfiles: Record<PersonKey, PersonProfile> = {
  dhy: {
    key: 'dhy',
    name: 'DHY',
    subtitle: '内容待定',
    description: '这里会放 DHY 的专属内容。先把入口留好，后面可以继续补页面结构和栏目。',
    modules: [],
  },
  thp: {
    key: 'thp',
    name: 'THP',
    subtitle: '内容待定',
    description: '这里会放 THP 的专属内容。当前先保留为独立人物主页。',
    modules: [],
  },
  hjy: {
    key: 'hjy',
    name: 'HJY',
    subtitle: '内容待定',
    description: '这里会放 HJY 的专属内容。后续可以按你的描述继续展开。',
    modules: [],
  },
  pp: {
    key: 'pp',
    name: 'PP',
    subtitle: '小说阅读和诗词学习',
    description: 'PP 的空间先放两个模块：一个用于看小说，另一个用于小学生读诗词。',
    modules: [
      {
        title: '看小说',
        description: '小说阅读模块，后续可以扩展成书架、章节目录和阅读页面。',
        path: '/pp/novels',
        status: '阅读入口',
      },
      {
        title: '上传小说',
        description: '进入后台上传 TXT 或 Markdown 小说文件，先保存到服务器本地磁盘。',
        path: '/admin/novels',
        status: '后台入口',
      },
      {
        title: '小学生读诗词',
        description: '诗词学习模块，后续可以加入注音、注释、译文、朗读和背诵练习。',
        path: '/pp/poems',
        status: '学习入口',
      },
    ],
  },
}

export const people = Object.values(personProfiles)
