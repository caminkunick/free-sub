import { FabGroup, FabIcon } from "../fab.group";
import { BackLink } from "../back.link";
import { MainContainer } from "../main.container";
import {
  faFileAlt,
  faHeading,
  faImage,
  faMinus,
  faParagraph,
  faSave,
  faTable,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { TitleEditor } from "../title.editor";
import { FeatureEditor } from "../feature.editor";
import { useState } from "react";
import { FSImage } from "../ctrl/image";
import { VisibilityEditor } from "../visibility.editor";
import { Box, Container } from "@mui/material";
import { ContentHeader } from "../content.header";
import { HideToolbar } from "./hide.toolbar";

export type PageEditorProps = {
  title?: string;
  back?: string;
};

export const PageEditor = (props: PageEditorProps) => {
  const [image, setImage] = useState<FSImage | null>(
    new FSImage({
      url: "https://picsum.photos/300",
      pos: { left: "100%", top: "50%" },
    })
  );

  return (
    <MainContainer
      dense
      title={props.title}
      sidebar={
        <>
          {props.back && <BackLink divider to={props.back} />}
          <TitleEditor divider />
          <FeatureEditor value={image} onChange={setImage} />
          <VisibilityEditor value="public" />
          <HideToolbar />
        </>
      }
    >
      <Container maxWidth="sm">
        <Box pt={6}>
          <ContentHeader label="Page Editor" />
        </Box>
      </Container>
      <FabGroup>
        <FabIcon icon={faHeading} color="primary" />
        <FabIcon icon={faParagraph} color="primary" />
        <FabIcon icon={faImage} color="primary" />
        <FabIcon icon={faVideo} color="primary" />
        <FabIcon icon={faTable} color="primary" />
        <FabIcon icon={faFileAlt} color="primary" />
        <FabIcon icon={faMinus} color="primary" />
        <FabIcon icon={faSave} color="success" />
      </FabGroup>
    </MainContainer>
  );
};
