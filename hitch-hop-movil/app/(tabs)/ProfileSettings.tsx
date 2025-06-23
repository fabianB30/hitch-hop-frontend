////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 
// FUNCIONALIDAD HECHA POR CARLOS CABRERA Y DIEGO DURÁN
// 
// DESCRIPCIÓN: Pantalla de configuración del perfil del usuario; 
// donde se puede editar la información personal, 
// cambiar la contraseña y subir una foto de perfil.
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// IMPORTS
import React, { useRef, useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView, Platform } from "react-native";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input, InputField, InputSlot, InputError } from '@/components/ui/input';
import { Modal, ModalBackdrop, ModalContent, ModalCloseButton, ModalHeader, ModalBody, ModalFooter } from "@/components/ui/modal"
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogBody, AlertDialogBackdrop } from "@/components/ui/alert-dialog";
import { useRouter } from "expo-router";
import { Camera } from "lucide-react-native";
import { ChevronLeft } from "lucide-react-native";
import { Info } from "lucide-react-native";
import { Select, SelectError } from "@/components/ui/select";
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Eye, EyeOff } from "lucide-react-native";
import { updateUserRequest, User } from '../../interconnection/user';
import { useAuth } from './Context/auth-context';
import { getParameterByNameRequest } from '../../interconnection/paremeter';
import { getAllInstitutionsRequest } from '../../interconnection/institution';
import { changePasswordRequest } from '../../interconnection/user';
import { Pressable } from "@/components/ui/pressable";
import * as ImageManipulator from 'expo-image-manipulator';
const ImagenBG = require("/assets/images/1.5-BG_ProfileSettings.png");
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//    MAIN FUNCTION
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function ProfileSettings() {
  ///    Setters and Variables
  const [tiposId, setTiposId] = useState<string[]>([]);
  const [instituciones, setInstituciones] = useState([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [tiposUsuario, setTiposUsuario] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const { user, updateUser } = useAuth();
  const [passwordChangeError, setPasswordChangeError] = useState("");
  const [editable, setEditable] = useState(false);

  const [backupData, setBackupData] = useState(user);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentPasswordError, setCurrentPasswordError] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showSavedDialog, setShowSavedDialog] = useState(false);
  const router = useRouter();
  const formatDate = (isoString: string): string => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day} / ${month} / ${year}`;
  };
  const [userData, setUserData] = useState({
    ...user,
    birthDate: formatDate(user.birthDate),
  });


  //////////////////////////////////////////////////////////////////////////////////////
  ///    Initial User Data
  //  Here all the information is fetched from the backend and fed to special variables
  useEffect(() => {
    async function fetchData() {
      try {
        const paramId = await getParameterByNameRequest("Tipo de identificación");
        const paramGenero = await getParameterByNameRequest("Géneros");
        const paramTipoUsuario = await getParameterByNameRequest("Tipo de Usuario");
        const paramRol = await getParameterByNameRequest("Rol");
        const resInstitutions = await getAllInstitutionsRequest();

        if (paramId) setTiposId(paramId.parameterList);
        if (paramGenero) setGenres(paramGenero.parameterList);
        if (paramTipoUsuario) setTiposUsuario(paramTipoUsuario.parameterList);
        if (paramRol) setRoles(paramRol.parameterList);
        if (resInstitutions) setInstituciones(resInstitutions);
      } catch (error) {
        console.error("Error al obtener opciones:", error);
      }
    }

    fetchData();
  }, []);

  const institucionOptions = instituciones.map(inst => ({
    label: inst.nombre,
    value: inst._id
  }));

  //////////////////////////////////////////////////////////////////////////////////////
  // Reload user data when the screen is opened
  useFocusEffect(
    React.useCallback(() => {
      if (editable) return;

      async function reloadUser() {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUserData({
            ...parsedUser,
            birthDate: formatDate(parsedUser.birthDate),
          });
        }
      }
      reloadUser();
    }, [editable])
  );


  //////////////////////////////////////////////////////////////////////////////////////
  // Check every text field to verify it has the proper format and values
  const validateUserData = (data: typeof initialUser) => {
    const errors: Record<string, string> = {};
    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

    if (!nameRegex.test(data.name)) errors.name = "El nombre solo puede contener letras.";
    if (!nameRegex.test(data.firstSurname)) errors.firstSurname = "El primer apellido solo puede contener letras.";
    if (!nameRegex.test(data.secondSurname)) errors.secondSurname = "El segundo apellido solo puede contener letras.";

    if (data.identificationTypeId === "Cédula" && !/^\d{9}$/.test(String(data.identificationNumber))) {
      errors.identificationNumber = "La cédula debe tener 9 dígitos.";
    } else if (data.identificationTypeId === "DIMEX" && !/^\d{12}$/.test(String(data.identificationNumber))) {
      errors.identificationNumber = "El DIMEX debe tener 12 dígitos.";
    } else if (data.identificationTypeId === "Pasaporte" && !/^\d{9}$/.test(String(data.identificationNumber))) {
      errors.identificationNumber = "El pasaporte debe tener 9 dígitos.";
    }

    if (!/^\d{8}$/.test(String(data.phone))) errors.phone = "El teléfono debe tener 8 dígitos.";
    if (!/^.+@(itcr\.ac\.cr|estudiantec\.cr)$/.test(data.email)) {
      errors.email = "El correo debe terminar en @itcr.ac.cr o @estudiantec.cr.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  //////////////////////////////////////////////////////////////////////////////////////
  // editar y llamar al backend
  const toggleEdit = async () => {
    if (!editable) {
      setBackupData(userData);
      setEditable(true);
    } else {
      const isValid = validateUserData(userData);
      if (!isValid) {
        return;
      }
      try {
        const userId = user._id;
        const parseToISO = (friendlyDate: string): string => {
          const [day, month, year] = friendlyDate.split(" / ").map(Number);
          const date = new Date(year, month - 1, day);
          return date.toISOString();
        };
        const { password, ...restUser } = user;
        const dataToUpdate = {
          ...restUser,
          name: userData.name,
          firstSurname: userData.firstSurname,
          secondSurname: userData.secondSurname,
          email: userData.email,
          phone: userData.phone,
          identificationTypeId: userData.identificationTypeId,
          identificationNumber: userData.identificationNumber,
          birthDate: parseToISO(userData.birthDate),
          institutionId: userData.institutionId,
          genre: userData.genre,
          username: userData.username,
          role: userData.role,
          type: userData.type,
          photoUrl: userData.photoUrl,
        };

        await updateUserRequest(userId, dataToUpdate);
        await updateUser(dataToUpdate);

      } catch (error) {
        console.error("Error updating user:", error);
      }
      setEditable(false);
      setFieldErrors({});
      setShowSavedDialog(true);
    }
  };

  // Cancel edition and revert changes
  const cancelEdit = () => {
    setUserData(backupData);
    setEditable(false);
    setFieldErrors({});
  };

  // Set UserData according to the input fields
  const handleChange = (key: keyof typeof userData, value: string) => {
    setUserData({ ...userData, [key]: value });
  };

  // Update the user photo, special compression is applied
  const handleEditPhoto = async () => {
    // Permisos
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Se requieren permisos para acceder a tus fotos.');
      return;
    }
    // Abre la galería de imágenes
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: false,
    });

    // Base 64
    if (!result.canceled && result.assets.length > 0) {
      const selectedImage = result.assets[0];
      console.log("Imagen seleccionada:", selectedImage.uri);

      setUserData(prev => ({
        ...prev,
        photoUrl: selectedImage.uri,
      }));
    }
  };


  // Convierte la fecha de nacimiento a objeto Date
  const getDateFromString = (dateStr: string) => {
    const [day, month, year] = dateStr.split(" / ").map(Number);
    return new Date(year, month - 1, day);
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formatted = `${selectedDate.getDate().toString().padStart(2, "0")} / ${(selectedDate.getMonth() + 1).toString().padStart(2, "0")} / ${selectedDate.getFullYear()}`;
      setUserData({ ...userData, birthDate: formatted });
    }
  };

  //////////////////////////////////////////////////////////////////////////////////////
  // Maneja el cambio de contraseña
  const handleChangePassword = async () => {
    setCurrentPasswordError(false);
    setNewPasswordError(false);
    setConfirmPasswordError(false);
    setPasswordChangeError("");

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    let hasError = false;

    if (!currentPassword) {
      setCurrentPasswordError(true);
      hasError = true;
    }
    if (!passwordRegex.test(newPassword)) {
      setNewPasswordError(true);
      hasError = true;
    }
    if (newPassword !== confirmPassword) {
      setConfirmPasswordError(true);
      hasError = true;
    }
    if (hasError) return;

    const result = await changePasswordRequest({
      email: user.email,
      currentPassword,
      newPassword,
    });

    if (!result.success) {
      setPasswordChangeError(result.msg || "Error desconocido.");
      if (result.msg?.toLowerCase().includes("actual")) {
        setCurrentPasswordError(true);
      }
      return;
    }

    setShowPasswordModal(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowSavedDialog(true);
  };

  //////////////////////////////////////////////////////////////////////////////////////
  // CUERPO DE LA PANTALLA
  return (
    <View style={{ flex: 1, width: "100%" }}>
      <ScrollView contentContainerStyle={[styles.container, { width: "100%", flexGrow: 1 }]}>
        {/* Imagen de fondo superior */}
        <View style={styles.backgroundContainer}>
          <Image source={ImagenBG} style={styles.backgroundImage} resizeMode="cover" />
          <Text style={styles.hitchHopText}>HitchHop</Text>
        </View>
        {/* Recuadro principal con la información */}
        <View style={styles.profileCard}>
          {/* Botón de regresar arriba*/}
          <TouchableOpacity
            style={styles.backBtnAbsolute}
            onPress={() => {
              if (user?.role === "Conductor") {
                router.replace("/GestionPerfilConductor");
              } else if (user?.role === "Pasajero") {
                router.replace("/GestionPerfilPasajero");
              } else {
                router.back();
              }
            }}
          >
            <ChevronLeft color="black" size={35} />
          </TouchableOpacity>
          {/* Avatar centrado */}
          <View style={styles.avatarContainerCentered}>
            <View style={{ position: "relative", alignItems: "center", justifyContent: "center" }}>
              <Image
                source={
                  userData.photoUrl
                    ? { uri: userData.photoUrl }
                    : require('@/assets/images/iconPrimary.png')
                }
                style={styles.avatar}
              />
              {editable && (
                <TouchableOpacity
                  style={styles.editPhotoIconBtn}
                  onPress={handleEditPhoto}
                  activeOpacity={0.7}
                >
                  <Camera color="black" size={22} />
                </TouchableOpacity>
              )}
            </View>
            {editable && (
              <TouchableOpacity
                style={styles.editPhotoBtn}
                onPress={() => setShowPasswordModal(true)}
              >
                <Text style={styles.editPhotoText}>Cambiar contraseña</Text>
              </TouchableOpacity>
            )}
          </View>
          {/* Botón de editar/guardar y cancelar*/}
          {editable ? (
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.cancelBtn} onPress={cancelEdit}>
                <Text style={styles.cancelBtnText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={toggleEdit}>
                <Text style={styles.saveBtnText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.buttonRowCenter}>
              <TouchableOpacity style={styles.saveBtn} onPress={toggleEdit}>
                <Text style={styles.saveBtnText}>Editar información</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Información del usuario */}
          <View style={styles.formSection}>
            <ProfileInput label="Nombre de usuario" value={userData.username} editable={editable} onChange={v => handleChange("username", v)} />
            <ProfileInput label="Nombre" value={userData.name} editable={editable} onChange={v => handleChange("name", v)} error={fieldErrors.name} />
            <ProfileInput label="Primer Apellido" value={userData.firstSurname} editable={editable} onChange={v => handleChange("firstSurname", v)} error={fieldErrors.firstSurname} />
            <ProfileInput label="Segundo Apellido" value={userData.secondSurname} editable={editable} onChange={v => handleChange("secondSurname", v)} error={fieldErrors.secondSurname} />
            <ProfileInput label="Correo" value={userData.email} editable={editable} onChange={v => handleChange("email", v)} error={fieldErrors.email} />
            <ProfileInput label="Teléfono" value={String(userData.phone)} editable={editable} onChange={v => handleChange("phone", Number(v))} error={fieldErrors.phone} />
            <ProfileInput label="Tipo de ID" value={userData.identificationTypeId} editable={editable} onChange={v => handleChange("identificationTypeId", v)} options={tiposId} />
            <ProfileInput label="Número de ID" value={String(userData.identificationNumber)} editable={editable} onChange={v => handleChange("identificationNumber", Number(v))} error={fieldErrors.identificationNumber} />
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Fecha de nacimiento</Text>
              <TouchableOpacity
                onPress={() => editable && setShowDatePicker(true)}
                disabled={!editable}
                activeOpacity={editable ? 0.7 : 1}
              >
                <Input
                  isDisabled={!editable}
                  isInvalid={!!fieldErrors.birthDate}
                  style={{ backgroundColor: "#fff" }}
                  pointerEvents="none"
                >
                  <InputField
                    value={userData.birthDate || ""}
                    placeholder="Selecciona una fecha"
                    editable={false}
                    pointerEvents="none"
                    style={{ color: userData.birthDate ? "#222" : "#888" }}
                  />
                </Input>
              </TouchableOpacity>
              {fieldErrors.birthDate && (
                <InputError>{fieldErrors.birthDate}</InputError>
              )}
              {showDatePicker && (
                <DateTimePicker
                  value={getDateFromString(userData.birthDate)}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={handleDateChange}
                  maximumDate={new Date()}
                />
              )}
            </View>
            <ProfileInput label="Institución" value={institucionOptions.find(opt => opt.value === userData.institutionId)?.label || ""} editable={editable} onChange={v => handleChange("institucion", v)} options={institucionOptions} />
            <ProfileInput label="Género" value={userData.genre} editable={editable} onChange={v => handleChange("genre", v)} options={genres} />
            <ProfileInput label="Rol" value={userData.role} editable={editable} onChange={v => handleChange("role", v)} options={roles} />
          </View>
        </View>
        {/* Modal para cambiar contraseña */}
        <Modal
          isOpen={showPasswordModal}
          onClose={() => setShowPasswordModal(false)}
        >
          <ModalBackdrop />
          <ModalContent>
            <ModalHeader>
              <Text style={styles.modalTitle}>Cambiar Contraseña</Text>
              <ModalCloseButton onPress={() => setShowPasswordModal(false)} />
            </ModalHeader>
            <ModalBody>
              <Input isInvalid={currentPasswordError} style={{ marginBottom: 4 }}>
                <InputField
                  placeholder="Contraseña actual"
                  secureTextEntry={!showCurrentPassword}
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  style={{ paddingRight: 36 }}
                />
                <TouchableOpacity
                  style={{ position: "absolute", right: 10, top: 8 }}
                  onPress={() => setShowCurrentPassword((v) => !v)}
                  hitSlop={10}
                >
                  {showCurrentPassword ? (
                    <EyeOff size={20} color="#888" />
                  ) : (
                    <Eye size={20} color="#888" />
                  )}
                </TouchableOpacity>
              </Input>
              {passwordChangeError ? (
                <Text style={{ color: "red", marginBottom: 8 }}>{passwordChangeError}</Text>
              ) : null}

              <Input isInvalid={newPasswordError} style={{ marginBottom: 4 }}>
                <InputField
                  placeholder="Contraseña nueva"
                  secureTextEntry={!showNewPassword}
                  value={newPassword}
                  onChangeText={setNewPassword}
                  style={{ paddingRight: 36 }}
                />
                <TouchableOpacity
                  style={{ position: "absolute", right: 10, top: 8 }}
                  onPress={() => setShowNewPassword((v) => !v)}
                  hitSlop={10}
                >
                  {showNewPassword ? (
                    <EyeOff size={20} color="#888" />
                  ) : (
                    <Eye size={20} color="#888" />
                  )}
                </TouchableOpacity>
              </Input>
              {newPasswordError && (
                <InputError>La contraseña no cumple los requisitos</InputError>
              )}

              <Input isInvalid={confirmPasswordError} style={{ marginBottom: 0 }}>
                <InputField
                  placeholder="Confirmar contraseña"
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  style={{ paddingRight: 36 }}
                />
                <TouchableOpacity
                  style={{ position: "absolute", right: 10, top: 8 }}
                  onPress={() => setShowConfirmPassword((v) => !v)}
                  hitSlop={10}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} color="#888" />
                  ) : (
                    <Eye size={20} color="#888" />
                  )}
                </TouchableOpacity>
              </Input>
              {confirmPasswordError && (
                <InputError>Las contraseñas no coinciden.</InputError>
              )}

              <View
                style={{
                  backgroundColor: "#F5F5F5",
                  borderRadius: 8,
                  padding: 12,
                  marginTop: 16,
                  flexDirection: "row",
                  alignItems: "flex-start",
                  gap: 8,
                }}
              >
                <Info color="#787878" size={20} style={{ marginTop: 2 }} />
                <Text style={{ color: "#444", fontSize: 14, flex: 1 }}>
                  Mínimo 8 caracteres, con al menos{"\n"}
                  1 letra mayúscula, 1 letra minúscula, y 1 número.
                </Text>
              </View>
            </ModalBody>
            <ModalFooter>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => {
                  setShowPasswordModal(false);
                  setCurrentPassword("");
                  setNewPassword("");
                  setConfirmPassword("");
                  setCurrentPasswordError(false);
                  setNewPasswordError(false);
                  setConfirmPasswordError(false);
                  setShowCurrentPassword(false);
                  setShowNewPassword(false);
                  setShowConfirmPassword(false);
                  setPasswordChangeError("");
                }}
              >
                <Text style={styles.cancelBtnText}>Volver</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveBtn}
                onPress={handleChangePassword}
              >
                <Text style={styles.saveBtnText}>Confirmar</Text>
              </TouchableOpacity>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </ScrollView>

      {/* AlertDialog de confirmación de guardado */}
      <AlertDialog isOpen={showSavedDialog} onClose={() => setShowSavedDialog(false)}>
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 12 }}>
              ¡Cambios guardados!
            </Text>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text style={{ marginBottom: 24 }}>Tu información se guardó correctamente.</Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Pressable
              onPress={() => setShowSavedDialog(false)}
              style={{ padding: 8, backgroundColor: "#7875F8", borderRadius: 8, minWidth: 100, alignItems: "center" }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Aceptar</Text>
            </Pressable>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </View>
  );
}

function ProfileInput({
  label,
  value,
  editable,
  onChange,
  options,
  error,
}: {
  label: string;
  value: string;
  editable?: boolean;
  onChange?: (value: string) => void;
  options?: string[];
  error?: string;
}) {

  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>

      {options ? (
        <>
          <Select
            selectedValue={value}
            onValueChange={onChange!}
            options={options}
            isDisabled={!editable}
            isInvalid={!!error}
          />
          {error && <SelectError>{error}</SelectError>}
        </>
      ) : (
        <>
          <Input isInvalid={!!error} isDisabled={!editable}>
            <InputField
              value={value}
              onChangeText={onChange}
              editable={editable}
            />
          </Input>
          {error && <InputError>{error}</InputError>}
        </>
      )}
    </View>
  );
}

//////////////////////////////////////////////////////////////////////////////////////
// STYLES AND GRAPHICS
//////////////////////////////////////////////////////////////////////////////////////

const styles = StyleSheet.create({
  container: {
    //paddingHorizontal: 0,padding: 24,
    paddingBottom: 70,
    backgroundColor: "#fff",
    flexGrow: 1,
    //alignItems: "center",
    width: "100%",
  },
  backgroundContainer: {
    width: "100%",
    height: 120,
    position: "relative",
    alignItems: "center",
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  hitchHopText: {
    position: "absolute",
    top: 15,
    right: 7,
    zIndex: 3,
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    letterSpacing: 1,
    fontFamily: "Exo",
    textShadowColor: "#7875F8",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  backgroundImage: {
    width: "100%",
    height: 350,
    position: "absolute",
    bottom: 0,
    left: 0,
    zIndex: 1,
  },
  backBtnAbsolute: {
    position: "absolute",
    top: 5,
    left: 5,
    zIndex: 2,
    padding: 8,
    borderRadius: 20,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
  },
  avatarContainerCentered: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 24,
    marginTop: -70,
  },
  editPhotoIconBtn: {
    position: "absolute",
    bottom: 8,
    right: -5,
    backgroundColor: "#FFAB00",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
    zIndex: 10,
  },
  backBtnText: {
    fontSize: 22,
    color: "#7875F8",
    fontWeight: "bold",
  },
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 24,
    marginTop: -60,
    padding: 24,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    alignItems: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ECECFF",
    marginBottom: 12,
  },
  editPhotoBtn: {
    backgroundColor: "#FFAB00",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginVertical: 4,
  },
  editPhotoText: {
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "Exo",
  },
  formSection: {
    width: "100%",
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    fontFamily: "Exo",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ECECFF",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#white",
  },
  inputDisabled: {
    backgroundColor: "#ECECFF",
    color: "#888",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ECECFF",
    borderRadius: 8,
    backgroundColor: "#ECECFF",
    padding: 10,
  },
  buttonRowCenter: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: 24,
    marginTop: -15,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 12,
    marginBottom: 24,
  },
  cancelBtn: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#7875F8",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 8,
  },
  cancelBtnText: {
    color: "#7875F8",
    fontWeight: "bold",
  },
  saveBtn: {
    backgroundColor: "#7875F8",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  saveBtnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalOverlay: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    width: "90%",
    maxWidth: 350,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
