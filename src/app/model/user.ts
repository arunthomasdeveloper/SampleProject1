export class User {
access_token: string;
expires_in:string;
refresh_expires_in: string;
refresh_token:string;
token_type: string;
id_token:string;  
session_state:string;

id:string;
email:string;
emailVerified:string;
firstName:string;
lastName:string;
username:string;
credentials:[{type:string,value:string}];
attributes:[];
disableableCredentialTypes:[];
requiredActions:[];
enabled:boolean;
access:[accessInfo];

}

export class accessInfo{
    manageGroupMembership:string;
    view:string;
    mapRoles:string;
    impersonate:string;
    manage:string;
}

export class userContact{
    uuid:string;
    userContactInfo:addressInfo;
   userCrenditials:[];
}
export class addressInfo{
    addressLine1 :string ;
    addressLine2 : string;
    addressLine3 :string ;
    country : string;
    countryCode : string;
    mobileNo :string;
    postCode : string;
}

export class credentialsInfo{
    type:string;
    value:string;
    temporary:boolean;
}

