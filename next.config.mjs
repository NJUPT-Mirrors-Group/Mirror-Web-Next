/** @type {import('next').NextConfig} */
import million from "million/compiler";
const nextConfig = {};
const millionConfig = {
  auto: {
    rsc: true,
  },
  rsc: true
};
export default million.next(nextConfig, millionConfig);
