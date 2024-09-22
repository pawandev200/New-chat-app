// SearchInput.js
import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import toast from "react-hot-toast";

const SearchInput = ({ directMessagesContacts, channels, setFilteredContacts, setShowFilteredResults }) => {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    if (search.trim().length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }

    // Combine DMs and channels into a single array for searching
    const allConversations = [
      ...directMessagesContacts.map((c) => ({ ...c, type: "dm" })),
      ...channels.map((c) => ({ ...c, type: "channel" })),
    ];

    // Filter conversations based on the search term
    const filteredConversations = allConversations.filter((c) => {
      // Ensure conversation has a name property
      if (!c.name) {
        console.warn("Conversation is missing the 'name' property:", c);
        return false; // Skip conversations without a name
      }

      return c.name.toLowerCase().includes(search.trim().toLowerCase());
    });

    if (filteredConversations.length > 0) {
      setFilteredContacts(filteredConversations);
      setShowFilteredResults(true);
    } else {
      toast.error("No such conversation found!");
      setFilteredContacts([]);
      setShowFilteredResults(false);
    }
    setSearch(""); // Clear search input
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 my-3">
      <input
        type="text"
        placeholder="Search…"
        className="input input-bordered rounded-full w-full p-2 bg-[#2f303b] text-white"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
};

export default SearchInput;

