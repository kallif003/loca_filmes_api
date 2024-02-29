export enum Messages {
  TITLE_REGISTER = "Cadastrado",
  SUBTITLE_REGISTER = "Cadastro realizado com sucesso",

  TITLE_ERROR_REGISTER = "Erro ao cadastrar",
  SUBTITLE_ERROR_REGISTER = "Houve um erro inesperado no cadastro",

  TITLE_ERROR = "Houve um erro inesperado",
  SUBTITLE_ERROR = "Tivemos um erro em nosso servidor, por favor tente novamente",

  TITLE_DELETE_REGISTER = "Deletado",
  SUBTITLE_DELETE_REGISTER = "Registro deletado com sucesso",

  TITLE_ORDER_CANCELED = "Cancelado",
  SUBTITLE_ORDER_CANCELED = "Pedido cancelado com sucesso",

  TITLE_ERROR_DELETE_REGISTER = "Erro ao deletar",
  SUBTITLE_ERROR_DELETE_REGISTER = "Houve um erro inesperado ao deletar",

  TITLE_UPDATE_REGISTER = "Atualizado",
  SUBTITLE_UPDATE_REGISTER = "Registro atualizado com sucesso",

  TITLE_ERROR_UPDATE_REGISTER = "Erro ao atualizar",
  SUBTITLE_ERROR_UPDATE_REGISTER = "Houve um erro inesperado ao atualizar",

  SUBTITLE_EXISTENT_DEPARTMENT = "O departamento que você está tentando criar já existe em nosso banco",
  SUBTITLE_EXISTENT_SEDIMENT = "O resíduo que você está tentando criar já existe em nosso banco",
  SUBTITLE_ERROR_UPDATE_DEPARTMENT = "Esse nome de departamento já existe em nosso banco",
  SUBTITLE_ERROR_UPDATE_SEDIMENTS = "Esse nome de resíduo já existe em nosso banco",

  TITLE_THERE_ARE_NO_RECORDS = "Não há registros",
  SUBTITLE_THERE_ARE_NO_RECORDS = "Não foram encontrados registros para essa busca",

  TITLE_EXISTING_USER = "Username inválido",
  SUBTITLE_EXISTING_USER = "O nome de usuário fornecido já existe em nosso banco",

  TITLE_COLLECTION_CREATED = "Sucesso",
  SUBTITLE_COLLECTION_CREATED = "Pedido de coleta realizado",

  TITLE_UPDATE_COLLECTION = "Atualizado",
  SUBTITLE_UPDATE_COLLECTION = "Coleta atualizada com sucesso",

  TITLE_USER_NOT_FOUND = "Usuário não encontrado",
  SUBTITLE_USER_NOT_FOUND = "Esse usuário não existe em nosso sistema",
}

export enum Permissions {
  MASTER = "MASTER",
  ADMIN = "ADMIN",
  COLLABORATOR = "COLLABORATOR",
  CLIENT = "CLIENT",
}

export enum Routes {
  LOGIN = "/api/login",
  SAVE_ADMIN = "/api/save_admin",
  SAVE_USER = "/api/user/save",
  GET_ALL_USERS = "/api/getAllUsers",
  UPDATE_USER = "/api/user/update/:id",
  DELETE_USER = "/api/user/:id",
  GET_ALL_NAMES = "/api/get_all_names",
  GET_ALL_DOCNUMBERS = "/api/get_all_docNumbers",
  GET_USER_BY_NAME_OR_DOCNUM = "/api/get_user_by_name_or_docNum",
}
