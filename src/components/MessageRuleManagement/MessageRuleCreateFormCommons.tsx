import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    FormHelperText,
    TextField,
    Typography,
} from "@mui/material";
import { Checkbox, CheckboxGroup, Textarea } from "@nextui-org/react";
import { FC, FormEvent, ReactNode, useRef } from "react";
import { UseFormReturn } from "react-hook-form";
import { MdExpandMore } from "react-icons/md";
import EntitySelect from "../Form/EntitySelect";

interface MessageRuleCreateFormCommonsProps extends UseFormReturn {
    children: ReactNode;
    noParams?: boolean;
}

// const AccorditionCloseIndicator: FC<AccordionItemIndicatorProps> = ({
//     isOpen,
//     isDisabled,
// }) =>
//     isOpen && !isDisabled ? <MdKeyboardArrowRight /> : <MdKeyboardArrowDown />; // MdKeyboardArrowRight since nextui will apply CSS to rotate the icon by 90deg

const MessageRuleCreateFormCommons: FC<MessageRuleCreateFormCommonsProps> = ({
    children,
    register,
    setValue,
    noParams = false,
}) => {
    const actionsRef = useRef<string[]>([]);
    const actionsRegister = register("actions");

    return (
        <div>
            <Accordion disabled={noParams}>
                <AccordionSummary
                    expandIcon={<MdExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Parameters</Typography>
                </AccordionSummary>
                <AccordionDetails>{children}</AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<MdExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Automatic Actions</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <CheckboxGroup
                        defaultValue={[]}
                        label="Actions"
                        onChangeCapture={(
                            event: FormEvent<HTMLInputElement>
                        ) => {
                            console.log("onChangeCapture", event);
                            const value = (event.target as any).value;
                            const index = actionsRef.current.indexOf(value);

                            if (index === -1) {
                                actionsRef.current.push(value);
                            } else {
                                actionsRef.current.splice(index, 1);
                            }

                            console.log("actionsRef", actionsRef.current);

                            setValue(actionsRegister.name, [
                                ...actionsRef.current,
                            ]);
                        }}
                        name={actionsRegister.name}
                    >
                        <Checkbox value="verbal_warn">Verbal Warning</Checkbox>
                        <Checkbox value="delete">Delete Message</Checkbox>
                        <Checkbox value="warn">Warn User</Checkbox>
                        <Checkbox value="mute">Mute User</Checkbox>
                        <Checkbox value="clear">
                            Clear Recent Messages from the User
                        </Checkbox>
                    </CheckboxGroup>

                    <div className="pt-4"></div>

                    <Textarea
                        type="text"
                        label={"Reason for taking action"}
                        variant="flat"
                        minRows={2}
                        labelPlacement="outside"
                        placeholder={"Type here..."}
                        {...register("common_reason")}
                    />

                    <div className="pb-3"></div>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<MdExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Permissions and Exceptions</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="pt-2"></div>
                    <EntitySelect
                        entityType="channel"
                        textFieldLabel="Ignored Channels"
                        multiple
                        fieldName="disabled_channels"
                        setValue={setValue}
                        {...register("disabled_channels")}
                    />
                    <div className="pt-4"></div>
                    <TextField
                        label="Immune Users"
                        multiline
                        fullWidth
                        {...register("immune_users")}
                    />
                    <FormHelperText className="text-[#999]">
                        Enter the User IDs here, separated by newlines or
                        spaces. For more information on how to find IDs, go to{" "}
                        <a href="https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-">
                            this page
                        </a>
                        .
                    </FormHelperText>
                    <div className="pt-4"></div>
                    <TextField
                        label="Immune Roles"
                        multiline
                        fullWidth
                        {...register("immune_roles")}
                    />
                    <FormHelperText className="text-[#999]">
                        Enter the Role IDs here, separated by newlines or
                        spaces. For more information on how to find IDs, go to{" "}
                        <a href="https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-">
                            this page
                        </a>
                        .
                    </FormHelperText>
                </AccordionDetails>
            </Accordion>

            <div className="pb-4"></div>
        </div>
    );
};

export default MessageRuleCreateFormCommons;
