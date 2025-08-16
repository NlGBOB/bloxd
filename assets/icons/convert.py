import os
import cairosvg

SOURCE_FOLDER = '.' 


def convert_svgs_in_folder(folder_path):
    if not os.path.isdir(folder_path):
        print(f"Error: Folder not found at '{folder_path}'")
        return

    files_in_directory = os.listdir(folder_path)

    for filename in files_in_directory:
        if filename.lower().endswith('.svg'):
            input_path = os.path.join(folder_path, filename)
            output_filename = os.path.splitext(filename)[0] + '.png'
            output_path = os.path.join(folder_path, output_filename)

            print(f"  -> Converting '{filename}' to '{output_filename}'...")

            try:
                cairosvg.svg2png(
                    url=input_path,
                    write_to=output_path,
                    background_color="white"
                )
            except Exception as e:
                print(f"     [ERROR] Could not convert {filename}: {e}")

    print("\nConversion complete.")


if __name__ == "__main__":
    convert_svgs_in_folder(SOURCE_FOLDER)