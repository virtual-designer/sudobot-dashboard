/*
* This file is part of SudoBot Dashboard.
*
* Copyright (C) 2021-2023 OSN Developers.
*
* SudoBot Dashboard is free software; you can redistribute it and/or modify it
* under the terms of the GNU Affero General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* SudoBot Dashboard is distributed in the hope that it will be useful, but
* WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU Affero General Public License for more details.
*
* You should have received a copy of the GNU Affero General Public License
* along with SudoBot Dashboard. If not, see <https://www.gnu.org/licenses/>.
*/

import { AxiosResponse } from "axios";
import {
    FieldErrors,
    FieldNamesMarkedBoolean,
    FieldValues,
    UseFormClearErrors,
    UseFormGetFieldState,
    UseFormGetValues,
    UseFormRegister,
    UseFormReset,
    UseFormSetError,
    UseFormSetValue,
} from "react-hook-form";

export interface SettingCardProps {
    reset: UseFormReset<FieldValues>;
    clearErrors: UseFormClearErrors<FieldValues>;
    setError: UseFormSetError<FieldValues>;
    register: UseFormRegister<FieldValues>;
    setValue: UseFormSetValue<FieldValues>;
    errors: FieldErrors<FieldValues>;
    getFieldState: UseFormGetFieldState<FieldValues>;
    getValues: UseFormGetValues<FieldValues>;
    touchedFields: Partial<Readonly<FieldNamesMarkedBoolean<FieldValues>>>;
    data: AxiosResponse<any, any>["data"];
}
