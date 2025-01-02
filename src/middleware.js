import { NextResponse } from 'next/server'

// 配置需要保护的路径
export const config = {
  matcher: '/admin/:path*'
}

export async function middleware(request) {
  const session = request.cookies.get('admin_session')
  
  // 如果用户未登录且不是登录页面，重定向到登录页
  if (!session?.value && !request.nextUrl.pathname.includes('/admin/login')) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  // 如果用户已登录且访问登录页，重定向到管理首页
  if (session?.value && request.nextUrl.pathname.includes('/admin/login')) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
} 