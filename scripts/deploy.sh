#!/bin/bash

set -euo pipefail

# 可通过环境变量覆盖：
# - DEPLOY_RSA_PATH: 私钥路径（默认 ~/.ssh/id_rsa）
# - DEPLOY_SOURCE:   本地要上传的目录/文件（默认 build/*）
# - DEPLOY_TARGET:   scp 目标（默认 root@139.196.10.107:/usr/local/nginx）

rsa_path="${DEPLOY_RSA_PATH:-$HOME/.ssh/id_rsa}"
source_dir="${DEPLOY_SOURCE:-build/*}"
target_dir="${DEPLOY_TARGET:-root@139.196.10.107:/usr/local/nginx}"

echo "
🔨 开始部署测试环境...
"

if [ ! -f "$rsa_path" ]; then
  echo "❌ 未找到私钥文件：$rsa_path"
  echo "   你可以设置环境变量 DEPLOY_RSA_PATH 指向正确的私钥路径。"
  exit 1
fi

scp -i "$rsa_path" -r $source_dir "$target_dir"

echo "
🎊 测试环境部署成功！部署版本:$npm_package_version"
