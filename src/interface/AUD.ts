import { MetaWizardManager } from "../aud/meta/MetaWizardManager";
import { CommonUtil } from "../interface/CommonUtil"
import { ImageService } from "../interface/ImageService"
import { IGlobalConfig } from "../interface/IGlobalConfig"
import { MessageBox } from "../interface/MessageBox"
import { ImageEditorManager } from "../interface/ImageEditorManager"
import { IViewer } from "./IViewer";
import { BoxStyleList } from "../aud/drawing/BoxStyleList";

export interface AUD {
    Utility : CommonUtil;
    GlobalConfig : IGlobalConfig;
    MetaWizardManager : MetaWizardManager;
    ImageEditorManager : ImageEditorManager;
    GetMainViewer(): IViewer;
    GetViewer(viewerId: string): IViewer;
    Trans(code: string, option?: any): string;
    ImageService : ImageService;
    get BoxStyleList() : BoxStyleList;
    get MessageBox() : MessageBox;
}