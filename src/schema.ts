import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";
import path from "path";

const allTypes: any = fileLoader(path.join(__dirname, "./api/**/*.graphql"));

const allResolvers: any = fileLoader(
  path.join(__dirname, "./api/**/*.resolvers.*")
);

export const mergedTypes: any = mergeTypes(allTypes);
export const mergedResolvers: any = mergeResolvers(allResolvers);

const schema = makeExecutableSchema({
  typeDefs: mergedTypes,
  resolvers: mergedResolvers
});

export default schema;
