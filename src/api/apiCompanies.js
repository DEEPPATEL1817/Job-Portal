import supabaseClient, { supabaseUrl } from "@/utils/supabase";

export async function getCompanies(token){
    const supabase = await supabaseClient(token )
 
    

        const {data, error} = await supabase
        .from("companies")
        .select("*");

        if(error){
            console.error("Error fatching Companies:",error)
            return null;
        }
        return data;
}

// this fn is to add new company in the list from the recruiter end 
export async function addNewCompany(token,_,companyData){
    const supabase = await supabaseClient(token );

    const random = Math.floor(Math.random() * 90000);
    const fileName = `logo-${random}-${companyData.name}`;
  
    const { error: storageError } = await supabase.storage
      .from("company-logo")
      .upload(fileName, companyData.logo);

 
      if (storageError) throw new Error("Error uploading Company logo");
    
    const logo=`${supabaseUrl}/storage/v1/object/public/company-logo/${fileName}`
 
    

        const {data, error} = await supabase
        .from("companies")
        .insert([{
            name:companyData.name,
            logo
        }])
        .select();

        if(error){
            console.error("Error submitting Companies:",error)
            return null;
        }
        return data;
}