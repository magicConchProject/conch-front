"use client";

import MngMyPassword from "./MngMyPassword";
import MngMyUser from "./MngMyUser";
import MngParticipagtedGroup from "./MngParitipatedGroup";
import MyPageH1 from "./MyPageH1";

export default function MngUser() {
    return (
        <div>
            <section className="mb-3">
                <MyPageH1 title="내 정보" />
                <MngMyUser />
            </section>
            <section>
                <MyPageH1 title="참여 그룹" />
                <MngParticipagtedGroup />
            </section>
            <section>
                <MyPageH1 title="비밀번호 변경" />
                <MngMyPassword />
            </section>
        </div>
    );
}
