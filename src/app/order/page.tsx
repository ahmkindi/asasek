import { redirect } from "next/navigation"

export default function OrderPage() {
  redirect("/research?order=true")
}
