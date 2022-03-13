import type { NextPage } from "next";
import Head from "next/head";
import { useRef, useState, useEffect } from "react";
import { Footer } from "../components/Footer";
import { GroupList } from "../components/GroupList";
import { UsersList } from "../components/Users";
import { useGetApiGroups, useGetApiUsers, useGetApiUsersId
, useGetApiGroupsId } from "../service/default";
import { UsersIcon, UserIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { getStaticProps } from "./swagger";

const Home: NextPage = () => {
  const content = 
  useRef();

  //Groups data fetch & store to state
  const { data, status: groupStatus } = useGetApiGroups();
  const [groups, setGroups] = useState(data)

  useEffect(() => {
    if (groupStatus === 'success') {
      console.log("was successful")
      setGroups({ data });
      console.log(data)
      console.log(groups)
    }
  }, [groupStatus, data]);

  //Users data fetch & store to state
  const { data: users, status: userStatus } = useGetApiUsers();
  const [tempUser, setTempUser] = useState('')

  useEffect(() => {
    if (userStatus === 'success') {
      console.log("update to users was successful")
      alert('You have set a new user ' + tempUser)
      //will come back to set state once the API post works 
      // setGroups({ users });
      // console.log(data)
      // console.log(users)
    }
  }, [userStatus, users, tempUser]);


  return (
    <div tw="dark:bg-mono-900 bg-blue-500 dark:text-white min-h-screen flex flex-col">
      <Head>
        <title>User Groups</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <div tw="max-w-2xl mx-auto p-8 flex items-center">
          <Link href="/" passHref={true}>
            <a tw="font-extrabold text-2xl text-white dark:text-yellow-500">User Groups</a>
          </Link>
          <Link href="/swagger" passHref={true}>
            <a tw="ml-auto dark:text-mono-300 text-mono-100 underline">
              api docs
            </a>
          </Link>
        </div>
      </header>

      <main tw="place-content-between" ref={content}>
      <GroupList allGroups={groups} removeGroup={setGroups} />
      <UsersList allUsers={users} allGroups={groups} addUser={setTempUser}/> 
      </main>

      <Footer />
    </div>
  );
};

export default Home;
