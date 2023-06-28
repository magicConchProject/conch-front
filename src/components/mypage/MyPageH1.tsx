type Props = {
  title: string
}

export default function MyPageH1({title}: Props) {
  return <h1 className="font-bold text-xl text-yellow-500 mb-2">{title}</h1>
}