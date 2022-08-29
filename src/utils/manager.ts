export interface Manager{
    user_id: string,
    system_id: string,
    active: boolean
    display_name: string
    role: Role
    invitation_sent: string
 }

 export enum Role{
    MAINADMIN,ADMIN,MANAGER,
}