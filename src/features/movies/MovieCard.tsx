import { tv } from "tailwind-variants";
import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Image,
} from "@nextui-org/react";

import type { Movie } from ".";
import { movieTypeToChip } from "./constants";

const styles = tv({
  slots: {
    card: [
      "py-4 max-w-[294px] relative",
      "data-[busy=true]:opacity-65 data-[busy=true]:animate-pulse",
    ],
    cardHeader: ["pb-0 pt-2 px-4 flex-col gap-2 items-start"],
    cardBody: "overflow-visible py-2",
    cardImage: "object-cover rounded-xl aspect-[300/444] w-full",
    title: "font-bold text-large text-left",
    details: "flex gap-2 items-center",
    imdbId: "text-tiny uppercase font-bold",
  },
});

const { card, cardHeader, cardBody, cardImage, title, details, imdbId } =
  styles();

interface Props extends Movie {
  className?: string;
  isBusy?: boolean;
  onClick?: () => void;
}

export default function MovieCard(props: Props) {
  return (
    <Card
      data-busy={props.isBusy}
      className={card({ className: props.className })}
      onPress={props.onClick}
      isPressable
      isFooterBlurred
    >
      <CardBody className={cardBody()}>
        <Image alt="Movie poster" className={cardImage()} src={props.Poster} />
      </CardBody>

      <Divider />

      <CardHeader className={cardHeader()}>
        <h4 className={title()}>{props.Title}</h4>

        <div className={details()}>
          <p className={imdbId()}>{props.imdbID}</p>

          <Divider orientation="vertical" />
          <small className="text-default-500">{props.Year}</small>
          <Divider orientation="vertical" />

          {movieTypeToChip?.[props.Type] || (
            <Chip variant="flat" className="capitalize" radius="sm">
              {props.Type}
            </Chip>
          )}
        </div>
      </CardHeader>
    </Card>
  );
}
