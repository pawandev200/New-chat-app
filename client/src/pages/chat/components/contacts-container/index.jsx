// ContactsContainer.js
import { useState, useEffect } from "react";
import ContactList from "@/components/common/contact-list";
import Logo from "@/components/common/logo";
import ProfileInfo from "./components/profile-info";
import SearchInput from "./SearchInput"; // Import the new component
import apiClient from "@/lib/api-client";
import {
  GET_CONTACTS_WITH_MESSAGES_ROUTE,
  GET_USER_CHANNELS,
} from "@/lib/constants";
import { useAppStore } from "@/store";
import NewDM from "./components/new-dm/new-dm";
import CreateChannel from "./components/create-channel/create-channel";

const ContactsContainer = () => {
  const {
    setDirectMessagesContacts,
    directMessagesContacts,
    channels,
    setChannels,
  } = useAppStore();

  const [filteredContacts, setFilteredContacts] = useState([]);
  const [showFilteredResults, setShowFilteredResults] = useState(false);

  useEffect(() => {
    const getContactsWithMessages = async () => {
      const response = await apiClient.get(GET_CONTACTS_WITH_MESSAGES_ROUTE, {
        withCredentials: true,
      });
      if (response.data.contacts) {
        setDirectMessagesContacts(response.data.contacts);
      }
    };
    getContactsWithMessages();
  }, [setDirectMessagesContacts]);

  useEffect(() => {
    const getChannels = async () => {
      const response = await apiClient.get(GET_USER_CHANNELS, {
        withCredentials: true,
      });
      if (response.data.channels) {
        setChannels(response.data.channels);
      }
    };
    getChannels();
  }, [setChannels]);

  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[24vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full">
      <div className="pt-3">
        <Logo />
      </div>
        {/* Insert the SearchInput component here */}
        <SearchInput
        setFilteredContacts={setFilteredContacts}
        setShowFilteredResults={setShowFilteredResults}
      />
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="DMs" />
          <NewDM />
          <Title text="Groups" />
          <CreateChannel />
        </div>
      </div>

      {/* Insert the SearchInput component here
      <SearchInput
        setFilteredContacts={setFilteredContacts}
        setShowFilteredResults={setShowFilteredResults}
      /> */}

      <div className="overflow-y-auto scrollbar-hidden max-h-[75vh]">
        {showFilteredResults ? (
          <ContactList contacts={filteredContacts} />
        ) : (
          <>
            <ContactList contacts={directMessagesContacts} />
            <ContactList contacts={channels} isChannel />
          </>
        )}
      </div>
      <ProfileInfo />
    </div>
  );
};

export default ContactsContainer;




// export default ContactsContainer;

const Title = ({ text }) => {
  return (
    <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm">
      {text}
    </h6>
  );
};
