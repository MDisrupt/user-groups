import { useGetApiGroups, useDeleteApiGroupsIdUser} from "../service/default";
import { UsersIcon, UserIcon } from "@heroicons/react/outline";
import { Group } from "../pages/api/groups/index";
import { UseMutationOptions } from "react-query";
import { Z_UNKNOWN } from "zlib";
import React, { useState } from 'react';
import { group } from "console";



export function GroupList(){

  const { data: groups, refetch } = useGetApiGroups();

  const [stateGroups, setGroups] = useState(groups)


  //Move this behavior 
  const { mutateAsync: removeUserFromGroup, isSuccess } = useDeleteApiGroupsIdUser();


  const removeUser = async (event: React.MouseEvent<HTMLButtonElement>, user: string, groupId: string) => {
    event.preventDefault();
        const button: HTMLButtonElement = event.currentTarget;

        removeUserFromGroup({id: groupId, user: user})
        setGroups(groups)
        refetch()

  };

  return (
        <section tw="bg-mono-50 dark:bg-mono-700 w-1/3 flex float-right rounded-md mr-4">
          <div tw="grid max-w-4xl gap-8 p-8 sm:grid-cols-[repeat(1,1fr)] md:grid-cols-[repeat(1,1fr)] w-full">
            <h2 tw="sm:col-span-1 md:col-span-1 text-2xl font-bold">Groups</h2>
            {groups?.groups.map((group) => (
              <article tw="shadow-md bg-white rounded-md text-mono-800 p-4 flex flex-col items-center gap-1">
                <UsersIcon tw="w-16 h-16 p-0.5 border-4 border-mono-400 rounded-full my-4" />
                <header tw="text-lg font-bold">{group.name}</header>
                <div tw="text-sm text-mono-500">{group.desc}
                <h2 tw="sm:col-span-1 md:col-span-1 text-xl font-bold mt-2">Users:</h2>
                <div>{group.members.map((member) => {
                  return <div tw="flex place-content-between" >
                            <span tw="place-self-center ml-2 text-base font-bold"> {member.charAt(0).toUpperCase() + member.slice(1)} </span>
                            <button onClick={(event)=> removeUser(event, member,group.uuid)} tw="place-self-center shadow-md bg-red-300 rounded-md text-center text-sm text-mono-800 p-2 mt-4">Remove</button>
                        </div> 
                })}</div>
                </div>
              </article>
            ))}
           
          </div>
        </section>
  );
};

