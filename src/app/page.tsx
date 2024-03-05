import RegForm from "./reg-form";

export default function Home() {
  const org = process.env["GITHUB_ORG"]!;

  if (!org) return <p className="text-red-500">GITHUB_ORG is not set</p>;

  return (
    <main className="flex flex-col">
      <RegForm org={org} />
      <div className="mt-4 ml-auto text-gray-600 text-center">
        Made by Tamás Südi
      </div>
    </main>
  );
}
