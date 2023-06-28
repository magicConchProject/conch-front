'use client'

import AddGroup from "../post/AddGroup"
import MngMyGroup from "./MngMyGroup"
import MngParticipation from "./MngParticipation"
import MyPageH1 from "./MyPageH1"

export default function MngGroup() {
  return <div>
    <section className="mb-3 flex justify-end">
      <AddGroup/>
    </section>
    <section className="mb-3">
      <MyPageH1 title="그룹 참여 요청 관리"/>
      <MngParticipation/>
    </section>
    <section className="mb-3">
      <MyPageH1 title="그룹 관리"/>
      <MngMyGroup/>
    </section>
  </div>
}
