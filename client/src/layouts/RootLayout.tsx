import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/navigation/Sidebar";
import { userProfileStore } from "../stores/profileStore";
import { useAuth, useSession } from "@clerk/clerk-react";
import { useMutation } from "@apollo/client";
import {
  CreateProfileMutation,
  CreateProfileMutationVariables,
  Profile,
} from "../gql/graphql";
import { CREATE_PROFILE } from "../graphql/mutations/CreateProfile";

const RootLayout: React.FC = () => {
  const profile = userProfileStore((state) => state.profile);
  const setProfile = userProfileStore(
    (state) => state.setProfile as (profile: Profile | null) => void
  );
  const { session } = useSession();

  const [createProfile] = useMutation<
    CreateProfileMutation,
    CreateProfileMutationVariables
  >(CREATE_PROFILE, {});

  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (!isSignedIn) setProfile(null);
  }, [isSignedIn, setProfile]);

  useEffect(() => {
    const createProfileFn = async () => {
      if (!session?.user) return;
      try {
        await createProfile({
          variables: {
            input: {
              email: session?.user.emailAddresses[0].emailAddress,
              name: session?.user.fullName || "",
              imageUrl: session?.user.imageUrl,
            },
          },
          onCompleted: (data: CreateProfileMutation) => {
            setProfile(data.createProfile);
          },
          refetchQueries: ["GetServers"],
        });
        if (profile?.id) return;
        createProfileFn();
      } catch (error) {
        console.log("Error creating profile in backend", error);
      }
    };
  }, [session?.user]);
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};

export default RootLayout;
