"use client";

import { useFormState, useFormStatus } from "react-dom";
import { addUser } from "@/lib/actions";

export default function RegForm({ org }: { org: string }) {
  const [state, formAction] = useFormState(addUser, null);

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-80">
      <h1 className="text-2xl font-bold mb-4">
        GitHub Organization Invitation
      </h1>
      <form action={formAction}>
        <div className="mb-4">
          <label
            htmlFor="organization"
            className="block text-gray-700 font-bold mb-2"
          >
            Organization Name
          </label>
          <a
            href={`https://github.com/${org}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 black underline text-blue-500 hover:text-blue-600 focus:outline-none focus:text-blue-600"
          >
            GitHub/{org}
          </a>
        </div>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 font-bold mb-2"
          >
            GitHub Username
          </label>
          <input
            type="text"
            name="username"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
          />
        </div>
        <SubmitButton />
        <ServerMessage ok={state?.ok} message={state?.message} />{" "}
      </form>
    </div>
  );
}
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 disabled:opacity-50 disabled:bg-blue-400 disabled:cursor-not-allowed"
    >
      Send Invitation
    </button>
  );
}

function ServerMessage({ ok, message }: { ok?: boolean; message?: string }) {
  const { pending } = useFormStatus();
  if (pending) return null;
  // message = "fooo";
  // ok = true;
  if (ok === true) return <div className="mt-4 text-green-600">{message}</div>;
  if (ok === false) return <div className="mt-4 text-red-600">{message}</div>;
  return null;
}
