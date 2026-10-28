# 上游自动核验策略

自动审核覆盖 GitHub 仓库身份、归档状态、HEAD、README、许可证、安装来源、分类置信度和维护健康分。普通 PR 使用固定 fixture，不依赖实时网络。

维护者主动刷新（覆盖 `entries/` 全部条目）：

```bash
python scripts/verify_upstreams.py --refresh --entries --snapshot verification/upstream-snapshot.json
```

状态含义：

- `verified`：自动强制检查通过，或经人工复核（见下）确认，可参与推荐。
- `needs-review`：许可证、分类或安装来源存在机器无法可靠判定的异常；不阻断快照生成，但进入人工异常处理通道。
- `blocked`：归档、安装来源错配或其他强制检查失败；刷新命令返回非零，不能参与推荐。

### 人工复核清单

`verification/manual-review.json` 记录「条目声明已核实、但上游许可机器读不出来」的判定：

- 每条记录 `license`、`evidence_path`、`evidence_sha`（证据文件的 git blob SHA）、`head_sha`（复核时的上游提交）、`reviewed_at` 与 `evidence`（指向复核时的提交，避免链接随分支漂移）。
- 判定按**证据文件内容**校验：条目声明与上游 HEAD 都未变直接通过；上游有新提交时，重新取证据文件（LICENSE / README）的 blob SHA，内容没变就继续有效，变了才退回 `needs-review` 等待重看。
- 只提升状态，不改写上游数据；快照里保留原始 `issues` 便于审计。
- 上游确实没有许可声明（`UNKNOWN`）的条目不得写入该清单。

`site/data/skills.json` 会为每个条目带上 `verification_status` / `health_score` / `checked_at`；未出现在快照中的条目标为 `unverified`，不参与推荐。核验快照由定时工作流生成并上传，维护者确认后提交。

人工检查只用于 `needs-review` 及贡献者申诉，不再要求所有条目逐项人工批准。


