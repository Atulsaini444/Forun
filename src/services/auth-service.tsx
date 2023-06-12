import axios from "axios";

export const register = async (data: any) => {
  return await axios.post("https://api.realworld.io/api/users", data);
};

export const login = async (data: any) => {
  return await axios.post("https://api.realworld.io/api/users/login", data);
};

export const editProfile = async (data: any) => {
  return await axios.put("https://api.realworld.io/api/user", data);
};

export const createNewArticle = async (data: any) => {
  const res = await axios.get(`https://api.realworld.io/api/articles`, data);
};

export const getSingleArticle = async (slug: string | undefined) => {
  return await axios.get(`https://api.realworld.io/api/articles/${slug}`);
};

export const getUserProfile = async (slug: string | undefined) => {
  return await axios.get(`https://api.realworld.io/api/profiles/${slug}`);
};

export const getUserArticles = async (username: string) => {
  return await axios.get(
    `https://api.realworld.io/api/articles?author=${username}&limit=100&offset=0`
  );
};
