import LayoutContainer from "../containers/LayoutContainer"

export default function Introduce() {
    return <>
        <div className="bg-white w-full flex-1 relative">
            <div className="absolute h-full overflow-auto w-full flex justify-center px-[30px]">

                <LayoutContainer>
                    <h1>마법의 소라고동은 마법의 소라고동입니다!</h1>
                </LayoutContainer>


            </div>
        </div>
    </>
}