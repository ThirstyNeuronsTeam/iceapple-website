ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
REGION="ap-south-1"
REPO_NAME="website"
TAG="alpha"

aws ecr get-login-password --region "$REGION" \
| docker login --username AWS --password-stdin "$ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com"

docker buildx create --use --name crossbuilder >/dev/null 2>&1 || true

docker buildx build \
  --platform linux/amd64 \
  -t "$ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/$REPO_NAME:$TAG" \
  --push .
