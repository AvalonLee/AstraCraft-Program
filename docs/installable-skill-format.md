# 可安装技能格式（installable-skill）

可安装 Skill 必须声明：

```yaml
record_type: installable-skill
name: astracraft-recommender
description: 根据项目画像推荐条目。
```

本仓库只有根目录 `SKILL.md` 属于 `installable-skill`。它描述自己的触发条件、工作流和回退行为，不使用 `entry-record` 专属的目录评级或上游指标。

安装天工精选时只复制根目录文件。`entries/**/SKILL.md` 是推荐数据，即使文件名相同也不是技能包；需要某个条目时，应执行条目中指向真实上游仓库的安装命令。

