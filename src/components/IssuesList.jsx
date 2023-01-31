import React from "react";
import { useIssuesData, useSearchData } from "../helpers/queryhooks";
import { IssueItem } from "./IssueItem";

export default function IssuesList({ filters, status }) {
  const { isLoading, isSuccess, data } = useIssuesData(filters, status);
  const [searchValue, setSearchValue] = React.useState("");
  const searchQuery = useSearchData(searchValue);
  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSearchValue(event.target.elements.search.value);
        }}
      >
        <label htmlFor="search">Search Issues</label>
        <input
          type="search"
          placeholder="Search"
          id="search"
          name="search"
          onChange={(event) => {
            if (event.target.value.length === 0) setSearchValue("");
          }}
        ></input>
      </form>
      <h2>Issues List</h2>
      {isLoading ? (
        <p>Loading issues...</p>
      ) : searchQuery.fetchStatus === "idle" && searchQuery.isLoading ? ( //search query is disabled
        <ul className="issues-list">
          {data.map((item) => {
            return (
              <IssueItem
                key={item.id}
                title={item.title}
                number={item.number}
                assignee={item.assignee}
                commentCount={item.comments.length}
                createdBy={item.createdBy}
                createdDate={item.createdDate}
                labels={item.labels}
                status={item.status}
              />
            );
          })}
        </ul>
      ) : (
        <>
          <h2>Search Results</h2>
          {searchQuery.isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <p>{searchQuery.isSuccess && searchQuery.data.count} Results</p>
              <ul className="issues-list">
                {searchQuery.isSuccess &&
                  searchQuery.data.items.map((item) => {
                    return (
                      <IssueItem
                        key={item.id}
                        title={item.title}
                        number={item.number}
                        assignee={item.assignee}
                        commentCount={item.comments.length}
                        createdBy={item.createdBy}
                        createdDate={item.createdDate}
                        labels={item.labels}
                        status={item.status}
                      />
                    );
                  })}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
}
