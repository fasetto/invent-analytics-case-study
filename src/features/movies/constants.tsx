import { Chip } from "@nextui-org/react";
import type { MovieType } from ".";

export const movieTypeToChip: Record<MovieType, React.ReactNode> = {
  movie: (
    <Chip variant="flat" color="primary" radius="sm">
      Movie
    </Chip>
  ),
  series: (
    <Chip variant="flat" color="secondary" radius="sm">
      Series
    </Chip>
  ),
  episode: (
    <Chip variant="flat" color="danger" radius="sm">
      Episode
    </Chip>
  ),
  game: (
    <Chip variant="flat" color="warning" radius="sm">
      Game
    </Chip>
  ),
};
