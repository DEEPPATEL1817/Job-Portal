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
        query=query.eq("companies_id",company_id)
    }

    // this filter query is not working 
    if(searchQuery){
        query=query.ilike("Title",`%${searchQuery}%`)
    }

    const {data, error}=await query;

    if(error){
        console.error("error fetching jobs",error);
        return null;
    }
    return data;

}



// 
export async function savedJob(token,{ alreadySaved }, saveData){
    const supabase = await supabaseClient(token )
 
    if(alreadySaved){
        //here i change the name of error to DeleteError it means through this i can delete saved jobs

        const {data, error:deleteError} = await supabase
        .from("saved_jobs")
        .delete()
        .eq("job_id",saveData.job_id);

        if(deleteError){
            console.error("Error fatching Jobs:",error)
            return null;
        }
        return data;
    }
    else{
        const {data, error:insertError} = await supabase
        .from("saved_jobs")
        .insert([saveData])
        .select()
        
        if(insertError){
            console.error("error deleting saved jobs",insertError);
            return null;
        }
        return data;
    }
 
 }
 



 export async function getSingleJob(token,{job_id}){
    const supabase = await supabaseClient(token )
 
    

        const {data, error} = await supabase
        .from("Jobs")
        .select("*,Title,Location,Discription,companies(name,logo),application:application(*)")
        .eq("id",job_id)
        .single();
        console.log("application details",data)

        if(error){
            console.error("Error fatching job:",error)
            return null;
        }
        return data;
    }
    
    
    
//  working 

export async function updateHiringStatus(token, { job_id }, isOpen) {
    const supabase = await supabaseClient(token);
    const { data, error } = await supabase
      .from("Jobs")
      .update({ isOpen })
      .eq("id", job_id)
      .select();
      console.log("Job Open or closed Status",data)
  
    if (error) {
      console.error("Error Updating Hiring Status:", error);
      return null;
    }
  
    return data;
  }
  


  