'use client';
import Link from "next/link";

import Reminders from "@/components/reminders";

const RemindersPage = () => {
    return (
        <>
        <Link href={"/"}>
          <div
            className={
              "border-2 border-white rounded-md px-4 py-2 mx-5 my-4 max-w-48"
            }
          >
            <h3>Return Home &lt;--</h3>
          </div>
        </Link>
        <Reminders/>
        </>
    )
}

export default RemindersPage