import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  }
}

export default nextConfig
EOF3️⃣ app.yaml 생성 (App Engine용)bashcat > app.yaml << 'EOF'
runtime: nodejs20
handlers:
- url: /.*
  static_files: out/index.html
  upload: out/index.html
