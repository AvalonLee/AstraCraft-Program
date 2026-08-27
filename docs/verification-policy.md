# 上游自动核验策略

自动审核覆盖 GitHub 仓库身份、归档状态、HEAD、README、许可证、安装来源、分类置信度和维护健康分。普通 PR 使用固定 fixture，不依赖实时网络。

维护者主动刷新：

```bash
python scripts/verify_upstreams.py --refresh --catalog verification/catalog.json --snapshot verification/upstream-snapshot.json
```

状态含义：

- `verified`：自动强制检查通过，可参与推荐。
- `needs-review`：许可证、分类或安装来源存在机器无法可靠判定的异常；不阻断快照生成，但进入人工异常处理通道。
- `blocked`：归档、安装来源错配或其他强制检查失败；刷新命令返回非零，不能参与推荐。

人工检查只用于 `needs-review` 及贡献者申诉，不再要求所有条目逐项人工批准。定时工作流上传漂移快照，不直接修改主分支。

