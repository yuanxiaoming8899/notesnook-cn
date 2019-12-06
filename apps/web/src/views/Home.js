import React, { useEffect, useState } from "react";
import { Flex, Text } from "rebass";
import * as Icon from "react-feather";
import { db, ev, sendNewNoteEvent } from "../common";
import { Virtuoso as List } from "react-virtuoso";
import Button from "../components/button";
import Search from "../components/search";
import Note from "../components/note";

function Home() {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    function onRefreshNotes() {
      setNotes(db.getNotes());
    }
    onRefreshNotes();
    ev.addListener("refreshNotes", onRefreshNotes);
    return () => {
      ev.removeListener("refreshNotes", onRefreshNotes);
    };
  }, []);
  return (
    <Flex flexDirection="column" flex="1 1 auto">
      {notes.length > 0 ? (
        <Flex flexDirection="column" flex="1 1 auto">
          <Search placeholder="Search" />
          <List
            style={{
              width: "100%",
              flex: "1 1 auto",
              height: "auto",
              overflowX: "hidden"
            }}
            totalCount={notes.length}
            item={index => <Note index={index} item={notes[index]} />}
          />
          <Button
            Icon={Icon.Plus}
            content="Make a new note"
            onClick={sendNewNoteEvent}
          />
        </Flex>
      ) : (
        <Flex
          flex="1 1 auto"
          alignItems="center"
          justifyContent="center"
          color="#9b9b9b"
          flexDirection="column"
        >
          <Icon.Edit size={72} strokeWidth={1.5} />
          <Text variant="title">You have no notes</Text>
          <Button
            Icon={Icon.Edit2}
            onClick={sendNewNoteEvent}
            content="Let's make some"
            style={{ marginTop: 2, textAlign: "center" }}
            width={"auto"}
          />
        </Flex>
      )}
    </Flex>
  );
}

export default Home;
