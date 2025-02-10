import CompanyList from "@/components/dashboard/companiesClient";



export default async function Home() {
  const res = await fetch('http://localhost:4000/api/dashboard?action=getCompanies')
  console.log(res)
  const companies = res.json()

  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className="w-4/5 min-h-screen">
        {
          companies ? <CompanyList companies={companies} /> : <p>Loading...</p>
        }
      </div>
    </div>

  );
}
