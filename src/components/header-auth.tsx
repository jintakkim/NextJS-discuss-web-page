'use client'

import Link from "next/link"
import * as actions from "@/actions"
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Input, Button, Avatar, Popover, PopoverContent, PopoverTrigger} from "@nextui-org/react"
import {useSession} from "next-auth/react"
import { signOut as nextAuthSignOut } from "next-auth/react";

export default function HeaderAuth() {
    const session = useSession();

    let authContent: React.ReactNode;


    if(session.status === "loading") {
        authContent = null;
    }
    else if(session.data?.user) {

        authContent = (
            <Popover>
                <PopoverTrigger>
                    <Avatar src={session.data.user.image || ''}/>
                </PopoverTrigger>    
                <PopoverContent>
                    <div className="p-4">
                        <form action={ async ()=> {
                            await actions.signOut();
                            await nextAuthSignOut({ redirect: false });
                        }}>
                            <Button type="submit">Sign Out</Button>
                        </form>
                    </div>
                </PopoverContent>
            </Popover>)
    } else {
        authContent = <>
            <NavbarItem>
                <form action={actions.signIn}>
                    <Button type='submit' color="secondary" variant="bordered">Sign In</Button>
                </form>
            </NavbarItem>
            {/* <NavbarItem>
                <form action={actions.signOut}>
                    <Button type='submit' color="primary" variant="flat">Sign Up</Button>
                </form>
            </NavbarItem> */}
        </>
    }

    return authContent;

}