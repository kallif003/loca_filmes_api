"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = exports.Permissions = exports.Messages = void 0;
var Messages;
(function (Messages) {
    Messages["TITLE_REGISTER"] = "Cadastrado";
    Messages["SUBTITLE_REGISTER"] = "Cadastro realizado com sucesso";
    Messages["TITLE_ERROR_REGISTER"] = "Erro ao cadastrar";
    Messages["SUBTITLE_ERROR_REGISTER"] = "Houve um erro inesperado no cadastro";
    Messages["TITLE_ERROR"] = "Houve um erro inesperado";
    Messages["SUBTITLE_ERROR"] = "Tivemos um erro em nosso servidor, por favor tente novamente";
    Messages["TITLE_DELETE_REGISTER"] = "Deletado";
    Messages["SUBTITLE_DELETE_REGISTER"] = "Registro deletado com sucesso";
    Messages["TITLE_ORDER_CANCELED"] = "Cancelado";
    Messages["SUBTITLE_ORDER_CANCELED"] = "Pedido cancelado com sucesso";
    Messages["TITLE_ERROR_DELETE_REGISTER"] = "Erro ao deletar";
    Messages["SUBTITLE_ERROR_DELETE_REGISTER"] = "Houve um erro inesperado ao deletar";
    Messages["TITLE_UPDATE_REGISTER"] = "Atualizado";
    Messages["SUBTITLE_UPDATE_REGISTER"] = "Registro atualizado com sucesso";
    Messages["TITLE_ERROR_UPDATE_REGISTER"] = "Erro ao atualizar";
    Messages["SUBTITLE_ERROR_UPDATE_REGISTER"] = "Houve um erro inesperado ao atualizar";
    Messages["SUBTITLE_EXISTENT_DEPARTMENT"] = "O departamento que voc\u00EA est\u00E1 tentando criar j\u00E1 existe em nosso banco";
    Messages["SUBTITLE_EXISTENT_SEDIMENT"] = "O res\u00EDduo que voc\u00EA est\u00E1 tentando criar j\u00E1 existe em nosso banco";
    Messages["SUBTITLE_ERROR_UPDATE_DEPARTMENT"] = "Esse nome de departamento j\u00E1 existe em nosso banco";
    Messages["SUBTITLE_ERROR_UPDATE_SEDIMENTS"] = "Esse nome de res\u00EDduo j\u00E1 existe em nosso banco";
    Messages["TITLE_THERE_ARE_NO_RECORDS"] = "N\u00E3o h\u00E1 registros";
    Messages["SUBTITLE_THERE_ARE_NO_RECORDS"] = "N\u00E3o foram encontrados registros para essa busca";
    Messages["TITLE_EXISTING_USER"] = "Username inv\u00E1lido";
    Messages["SUBTITLE_EXISTING_USER"] = "O nome de usu\u00E1rio fornecido j\u00E1 existe em nosso banco";
    Messages["TITLE_COLLECTION_CREATED"] = "Sucesso";
    Messages["SUBTITLE_COLLECTION_CREATED"] = "Pedido de coleta realizado";
    Messages["TITLE_UPDATE_COLLECTION"] = "Atualizado";
    Messages["SUBTITLE_UPDATE_COLLECTION"] = "Coleta atualizada com sucesso";
    Messages["TITLE_USER_NOT_FOUND"] = "Usu\u00E1rio n\u00E3o encontrado";
    Messages["SUBTITLE_USER_NOT_FOUND"] = "Esse usu\u00E1rio n\u00E3o existe em nosso sistema";
})(Messages = exports.Messages || (exports.Messages = {}));
var Permissions;
(function (Permissions) {
    Permissions["MASTER"] = "MASTER";
    Permissions["ADMIN"] = "ADMIN";
    Permissions["USER_DEFAULT"] = "USER_DEFAULT";
    Permissions["CLIENT"] = "CLIENT";
})(Permissions = exports.Permissions || (exports.Permissions = {}));
var Routes;
(function (Routes) {
    Routes["LOGIN"] = "/api/login";
    Routes["SAVE_USER"] = "/api/user/save";
})(Routes = exports.Routes || (exports.Routes = {}));
//# sourceMappingURL=enum.js.map