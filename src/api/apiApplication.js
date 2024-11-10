import supabaseClient, { supabaseUrl } from "@/utils/supabase";

export async function applyJob(token,_,jobData){
    
    const supabase = await supabaseClient(token );
    
    const random = Math.floor(Math.random() * 90000);
    const fileName = `resume-${random}-${jobData.candidate_id}`;
  
    const { error: storageError } = await supabase.storage
      .from("resumes")
      .upload(fileName, jobData.resume);

 
      if (storageError) throw new Error("Error uploading Resume");
    
    const resume=`${supabaseUrl}/storage/v1/object/public/resumes/${fileName}`
        const {data, error} = await supabase
        .from("application")
        .insert([{...jobData,resume}]).select()

        if(error){
            console.error("Error submiting application:",error)
            return null;
        }
        return data;
}


export async function updateApplicationStatus(token, { job_id }, status) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("application")
    .update({ status })
    .eq("job_id", job_id)
    .select();

    console.log("recruiter Opinion",data)

  if (error || data.length === 0) {
    console.error("Error Updating Application Status:", error);
    return null;
  }

  return data;
}