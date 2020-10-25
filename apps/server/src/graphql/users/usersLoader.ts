import DataLoader from "dataloader";
import { getRepository } from "typeorm";

import { User } from "../../database/entity";
import { normalize } from "../../database/normalize";

const batchLoadUsers: DataLoader.BatchLoadFn<string | number, User> = async (
  ids
) => {
  const authors = await getRepository(User).findByIds(ids as any[]);
  const byId = normalize<User>(authors);

  return ids.map((id) => byId[id]);
};

export const buildUsersLoader = () =>
  new DataLoader<string | number, User>(batchLoadUsers);