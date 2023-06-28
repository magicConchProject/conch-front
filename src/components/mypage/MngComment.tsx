'use client'

import MngMyComment from "./MngMyComment"
import MyPageH1 from "./MyPageH1"

export default function MngComment(){
  return <div>
    <section className="mb-3">
      <MyPageH1 title="내 댓글 관리"/>
      <MngMyComment/>
    </section>
  </div>
}