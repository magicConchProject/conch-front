'use client'

import MngMyPost from "./MngMyPost"
import MyPageH1 from "./MyPageH1"

export default function MngPost() {
  return <div>
    <section className="mb-3">
      <MyPageH1 title="내 게시글 관리"/>
      <MngMyPost/>
    </section>
  </div>
}