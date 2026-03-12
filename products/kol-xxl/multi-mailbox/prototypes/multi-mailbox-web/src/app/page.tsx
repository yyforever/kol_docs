import Link from "next/link"

const demos = [
  {
    href: "/sender-settings",
    title: "1. 发件设置",
    desc: "谷歌邮箱 / 企业邮箱 tab — 多邮箱列表 + 添加",
  },
  {
    href: "/create-project",
    title: "2. 创建邮件项目",
    desc: "二级发件人选择 — 类型 radio + 邮箱 checkbox",
  },
  {
    href: "/edit-email",
    title: "3. 编辑邮件",
    desc: "发件人下拉 — 与创建项目一致的二级选择",
  },
  {
    href: "/message-center",
    title: "4. 消息中心",
    desc: "回复框 — 发件人切换（单选）",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-8">
      <div className="max-w-xl w-full space-y-6">
        <div>
          <h1 className="text-2xl font-bold">多邮箱绑定与发送</h1>
          <p className="text-muted-foreground mt-1">
            从 xxl0119 拆出 — 4 个改造点的交互原型
          </p>
        </div>
        <div className="space-y-3">
          {demos.map((d) => (
            <Link
              key={d.href}
              href={d.href}
              className="block rounded-lg border bg-card p-4 hover:border-primary/50 hover:shadow-sm transition-all"
            >
              <div className="font-medium">{d.title}</div>
              <div className="text-sm text-muted-foreground mt-1">{d.desc}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
