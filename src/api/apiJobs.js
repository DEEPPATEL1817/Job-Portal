//this token is coming from supabase (supabaseAccessToken)

import supabaseClient from "@/utils/supabase";


export async function getJobs(token,{ location, company_id, searchQuery }){
   const supabase = await supabaseClient(token )

    let query = supabase.from("Jobs").select("*,companies(name,logo),saved:saved_jobs(id)");

    if(location){
        query=query.eq("location", location); 
        // here eq is to compare a value inside a table of supabse
    }
    if(company_id){
        query=query.eq("comapny_id",company_id)
    }
    if(searchQuery){
        query=query.ilike("comapny_id",`%${searchQuery}%`)
    }

    const {data, error}=await query;

    if(error){
        console.error("error fetching jobs",error);
        return null;
    }
    return data;

}




