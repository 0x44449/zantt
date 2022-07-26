import dynamic from "next/dynamic";

const DynamicMooApp = dynamic(() => import("@/apps/moo/app"), {
  ssr: false
});

export default function App() {
  return (
    <DynamicMooApp />
  )
}