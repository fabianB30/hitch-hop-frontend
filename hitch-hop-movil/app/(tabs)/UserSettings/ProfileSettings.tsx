import React, { useRef, useState } from "react";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView, Platform } from "react-native";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "expo-router";

//const ImagenBG = require("../../../assets/images/1.5-BG_ProfileSettings.png");
//const ImagenPFP = require("../../../assets/images/1.5-DefaultPFP.png");


const initialUser = {
  nombre: "Juan",
  primerApellido: "Rodríguez",
  segundoApellido: "Chaves",
  correo: "juan@estudiantec.cr",
  institucion: "Tecnológico de Costa Rica",
  tipoId: "Cédula",
  numeroId: "116032348",
  fechaNacimiento: "27 / 02 / 2003",
  telefono: "83017776",
  genero: "Masculino",
  username: "juanRC02",
  tipoUsuario: "Administrador",
  foto: null,
};

const tiposId = ["Cédula", "DIMEX", "Pasaporte"];
const generos = ["Masculino", "Femenino", "Otro"];
const tiposUsuario = ["Administrador", "Usuario"];

export default function ProfileSettings() {
  const [editable, setEditable] = useState(false);
  const [userData, setUserData] = useState(initialUser);
  const [backupData, setBackupData] = useState(initialUser);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const validateUserData = (data: typeof initialUser) => {
    const errors: string[] = [];
    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    if (!nameRegex.test(data.nombre)) errors.push("El nombre solo puede contener letras.");
    if (!nameRegex.test(data.primerApellido)) errors.push("El primer apellido solo puede contener letras.");
    if (!nameRegex.test(data.segundoApellido)) errors.push("El segundo apellido solo puede contener letras.");
    if (!/^\d{9}$/.test(data.numeroId)) errors.push("El número de ID debe tener 9 dígitos.");
    if (!/^\d{8}$/.test(data.telefono)) errors.push("El teléfono debe tener 8 dígitos.");
    if (!/^.+@(itcr\.ac\.cr|estudiantec\.cr)$/.test(data.correo)) {
      errors.push("El correo debe terminar en @itcr.ac.cr o @estudiantec.cr.");
    }
    return errors;
  };

  const toggleEdit = () => {
    if (!editable) {
      setBackupData(userData);
      setEditable(true);
    } else {
      const errors = validateUserData(userData);
      if (errors.length > 0) {
        alert(errors.join("\n"));
        return;
      }
      setEditable(false);
    }
  };

  const cancelEdit = () => {
    setUserData(backupData);
    setEditable(false);
  };

  const handleChange = (key: keyof typeof userData, value: string) => {
    setUserData({ ...userData, [key]: value });
  };

const handleEditPhoto = async () => {

};

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    setShowPasswordModal(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Gestión de Perfil</Text>
      <View style={styles.profileSection}>
        {/* <Image
          source={
            userData.foto
              ? { uri: userData.foto }
              : require("@/assets/images/defaultPFP.png")
          }
          style={styles.avatar}
        /> */}
        {editable && (
          <TouchableOpacity style={styles.editPhotoBtn} onPress={handleEditPhoto}>
            <Text style={styles.editPhotoText}>Editar foto de perfil</Text>
          </TouchableOpacity>
        )}
        {editable && (
          <TouchableOpacity
            style={styles.editPhotoBtn}
            onPress={() => setShowPasswordModal(true)}
          >
            <Text style={styles.editPhotoText}>Cambiar contraseña</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.formSection}>
        <ProfileInput label="Institución" value={userData.institucion} editable={editable} onChange={v => handleChange("institucion", v)} />
        <ProfileInput label="Correo institucional" value={userData.correo} editable={editable} onChange={v => handleChange("correo", v)} />
        <ProfileInput label="Nombre" value={userData.nombre} editable={editable} onChange={v => handleChange("nombre", v)} />
        <ProfileInput label="Primer Apellido" value={userData.primerApellido} editable={editable} onChange={v => handleChange("primerApellido", v)} />
        <ProfileInput label="Tipo de ID" value={userData.tipoId} editable={editable} onChange={v => handleChange("tipoId", v)} options={tiposId} />
        <ProfileInput label="Segundo Apellido" value={userData.segundoApellido} editable={editable} onChange={v => handleChange("segundoApellido", v)} />
        <ProfileInput label="Número de ID" value={userData.numeroId} editable={editable} onChange={v => handleChange("numeroId", v)} />
        <ProfileInput label="Fecha de nacimiento" value={userData.fechaNacimiento} editable={editable} onChange={v => handleChange("fechaNacimiento", v)} />
        <ProfileInput label="Nombre de usuario" value={userData.username} editable={editable} onChange={v => handleChange("username", v)} />
        <ProfileInput label="Teléfono" value={userData.telefono} editable={editable} onChange={v => handleChange("telefono", v)} />
        <ProfileInput label="Tipo de usuario" value={userData.tipoUsuario} editable={editable} onChange={v => handleChange("tipoUsuario", v)} options={tiposUsuario} />
        <ProfileInput label="Género" value={userData.genero} editable={editable} onChange={v => handleChange("genero", v)} options={generos} />
      </View>
      <View style={styles.buttonRow}>
        {editable && (
          <TouchableOpacity style={styles.cancelBtn} onPress={cancelEdit}>
            <Text style={styles.cancelBtnText}>Cancelar</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.saveBtn} onPress={toggleEdit}>
          <Text style={styles.saveBtnText}>{editable ? "Guardar" : "Editar información"}</Text>
        </TouchableOpacity>
      </View>
      {showPasswordModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cambiar Contraseña</Text>
            <TextInput
              style={styles.input}
              placeholder="Contraseña actual"
              secureTextEntry
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Contraseña nueva"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirmar contraseña"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setShowPasswordModal(false)}>
                <Text style={styles.cancelBtnText}>Volver</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={handleChangePassword}>
                <Text style={styles.saveBtnText}>Confirmar cambios</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

function ProfileInput({
  label,
  value,
  editable,
  onChange,
  options,
}: {
  label: string;
  value: string;
  editable?: boolean;
  onChange?: (value: string) => void;
  options?: string[];
}) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      {options ? (
        <View style={styles.pickerContainer}>
          <TextInput
            style={[styles.input, !editable && styles.inputDisabled]}
            value={value}
            editable={false}
          />
        </View>
      ) : (
        <TextInput
          style={[styles.input, !editable && styles.inputDisabled]}
          value={value}
          editable={editable}
          onChangeText={onChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#fff",
    flexGrow: 1,
    alignItems: "center",
  },
  background: {
    width: 399,
    height: 373,
    position: 'absolute',
    left: -3,
    top: -251,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 24,
    fontFamily: Platform.OS === "ios" ? "Exo" : undefined,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 24,
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
  },
  input: {
    borderWidth: 1,
    borderColor: "#ECECFF",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#F9F9FF",
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
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
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