/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: "export",
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "http://localhost:8000/api/:path*",
            },
        ];
    },

    // 아래의 기능을 활성화 하면 프로젝트가 시작할 때 외부 모듈을 먼저 가지고 오려 시도한다
    // 별로 권장되지 않으며, 어쩔 수 없는 경우에만 사용할 것
    // experimental: {
    //     esmExternals: "loose",
    // },
};

module.exports = nextConfig;
