"use client";

import { AlreadyVerified } from "@/app/components/auth/already-verified";
import { InvalidVerificationToken } from "@/app/components/auth/invalid-verification-token";
import { NoTokenErrorMessage } from "@/app/components/auth/no-token-error-message";
import { ValidVerificationToken } from "@/app/components/auth/valid-verification-token";
import { TokenVerificationResult } from "@/lib/jwt";
import { showErrors } from "@/utils/show-errors";
import { signOut } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";



export default  function EmployerEmailVerificationPage() {
  const [tokenVerificationResult, setTokenVerificationResult] = useState<TokenVerificationResult | null>(null);
const params = useSearchParams();
const token = params.get("token");
    

 if(!token){
    return <NoTokenErrorMessage/>
 }
  
useEffect(() => {
  signOut({redirect:false});

  const getTokenVerificationResult= async () => {
    const response = await fetch(`/api/auth/verify-email/employers?token=${token}`);
    if(!response.ok){
      showErrors(["Failed to verify token"],()=>{})   
    }


    const data : TokenVerificationResult = await response.json(); 
    setTokenVerificationResult(data);
        console.log(data)

  }
  getTokenVerificationResult();
    
},[])

if(!tokenVerificationResult?.isValid && tokenVerificationResult?.message){
   return <AlreadyVerified userType="employer" message={tokenVerificationResult?.message || ""}/>
}

if(!tokenVerificationResult?.isValid){
   return <InvalidVerificationToken/>
}

if(tokenVerificationResult?.isValid){
   return <ValidVerificationToken userType="employer"/>
}

return <></>
 
  
}
